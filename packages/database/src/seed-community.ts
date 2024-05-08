import { faker } from '@faker-js/faker';
import { ThreadComment, prisma } from '.';

async function createComments(
  threadId: string,
  parentCommentId: string | null = null,
  depth: number = 0
): Promise<void> {
  const users = await prisma.user.findMany();
  const numComments = parentCommentId === null ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 3) + 1; // Ensure at least 1 reply for level 0 comments

  for (let i = 0; i < numComments; i++) {
    const replyAuthor = users[Math.floor(Math.random() * users.length)];
    const reply = await prisma.threadComment.create({
      data: {
        content: faker.lorem.paragraph(),
        author: { connect: { id: replyAuthor.id } },
        thread: { connect: { id: threadId } },
        replyTo: parentCommentId ? { connect: { id: parentCommentId } } : undefined,
      },
    });

    // Recursively create further replies
    if (depth > 0) {
      await createComments(threadId, reply.id, depth - 1);
    }
  }
}

void (async () => {
  try {
    const users = await prisma.user.findMany();

    await Promise.all(
      Array.from({ length: 5 }).map(async () => {
        const user = users[Math.floor(Math.random() * users.length)]; // Pick a random user
        const createdAt = faker.date.between({ from: faker.date.recent(120), to: new Date() });
        const numKeywords = Math.floor(Math.random() * 5) + 2; // Generate a random number of keywords (2 to 6)

        const keywords = Array.from({ length: numKeywords })
          .map(() => faker.word.words())
          .join(', ');

        const thread = await prisma.thread.create({
          data: {
            title: faker.lorem.words(5),
            content: faker.lorem.paragraphs(3),
            authorId: user.id,
            createdAt,
            keywords,
          },
        });

        // Create comments for the thread
        await createComments(thread.id, null, 3);
      })
    );
  } catch (error) {
    console.log({ error });

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
