import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from 'auth';
import { READ_REGISTRY_ACTIONS_VALIDATIONS_API } from '@modules/read-registries/lib/read-registries.validations';
import { ReadRegistryDeleteResponse } from '@modules/api/types/read-registries-api.types';

// /api/read-registry/multiple DELETE : Deletes multiple read registries
export async function DELETE(request: NextRequest): Promise<NextResponse<ReadRegistryDeleteResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const json = await request.json();
    const { registryIds } = READ_REGISTRY_ACTIONS_VALIDATIONS_API.DELETE_MULTIPLE.parse(json);

    await prisma.readRegistry.deleteMany({
      where: { id: { in: registryIds } },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;
    else if (error instanceof z.ZodError) errorMessage = error.issues[0].message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
