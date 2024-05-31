import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createReadTargetsValidationSchema,
  editReadTargetsValidationSchema,
} from '@modules/dashboard/validations/dashboard.validations';
import type {
  DashboardReadTargetsDeleteResponse,
  DashboardReadTargetsGetResponse,
  DashboardReadTargetsPatchResponse,
  DashboardReadTargetsPostResponse,
} from '@modules/api/types/dashboard-api.types';
import { auth } from 'auth';

// /api/dashboard/read-targets GET : Gets the read targets of the user
export async function GET(): Promise<NextResponse<DashboardReadTargetsGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const userReadTargets = await prisma.readTargets.findUnique({
      where: { userId: session.user.id },
    });

    if (!userReadTargets) {
      return NextResponse.json({ result: null }, { status: 200 });
    }

    // The target read targets that are stored in db.
    const targetReadTargets = {
      daily: userReadTargets.daily,
      monthly: userReadTargets.monthly,
      weekly: userReadTargets.weekly,
    };

    // We now fetch the read registries in order to calculate current status of read targets.
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
      select: { createdAt: true, pagesRead: true },
    });

    const readTargets = {
      daily: 0,
      monthly: 0,
      weekly: 0,
    };

    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    readRegistries.forEach((registry) => {
      const date = new Date(registry.createdAt);

      // Compare the date part of today with the date part of registry.createdAt
      if (date.toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
        readTargets.daily += registry.pagesRead;
      }

      // Check if the registry is within the current week
      if (date >= startOfWeek) {
        readTargets.weekly += registry.pagesRead;
      }

      // Check if the registry is within the current month
      if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
        readTargets.monthly += registry.pagesRead;
      }
    });

    return NextResponse.json({ result: { targetReadTargets, readTargets } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/dashboard/read-targets POST : Creates the read targets for the user
export async function POST(request: NextRequest): Promise<NextResponse<DashboardReadTargetsPostResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Check if user already created read targets.
    const count = await prisma.readTargets.count({ where: { user: { id: session.user.id } } });
    if (count > 0) {
      return new NextResponse('User already created read targets!', { status: 409 });
    }

    const json = await request.json();
    const { daily, monthly, weekly } = createReadTargetsValidationSchema.parse(json);

    await prisma.readTargets.create({
      data: {
        daily,
        monthly,
        weekly,
        user: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/dashboard/read-targets PATCH : Updates the read targets for the user
export async function PATCH(request: NextRequest): Promise<NextResponse<DashboardReadTargetsPatchResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Check if user created read targets.
    const userReadTargets = await prisma.readTargets.findUnique({
      where: { userId: session.user.id },
    });

    if (!userReadTargets) {
      return new NextResponse('User did not create read targets yet!', { status: 409 });
    }

    const json = await request.json();
    const { daily, monthly, weekly } = editReadTargetsValidationSchema.parse(json);

    const targetReadTargets = await prisma.readTargets.update({
      where: { userId: session.user.id },
      data: {
        daily,
        monthly,
        weekly,
      },
    });

    return NextResponse.json({ targetReadTargets });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

// /api/dashboard/read-targets DELETE : Deletes the read targets for the user
export async function DELETE(request: NextRequest): Promise<NextResponse<DashboardReadTargetsDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Check if user created read targets.
    await prisma.readTargets.delete({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
