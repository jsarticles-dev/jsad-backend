import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import {
  NewsletterModel,
  addNewNewsletter,
  deleteNewsletterById,
  findLastAddedNewsletter,
  findNewsletterById,
  findNewslettersByIds,
  updateNewsletterById,
} from "../model/newsletter";
import {
  connectDB,
  dropCollections,
  dropDB,
} from "../configs/mongoMemoryServer";

describe("Newsletter Model", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it("should create  newsletter", async () => {
    const VALID_NEWSLETTER = {
      header: "Newsletter 1",
      content: "Content!",
      number: 1,
      dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
    };
    const createdNewsletter = await addNewNewsletter(VALID_NEWSLETTER);
    expect(createdNewsletter).toBeDefined();
    expect(createdNewsletter._id).toBeDefined();
    expect(createdNewsletter.header).toBe(VALID_NEWSLETTER.header);
    expect(createdNewsletter.content).toBe(VALID_NEWSLETTER.content);
    expect(createdNewsletter.number).toBe(VALID_NEWSLETTER.number);
    expect(createdNewsletter.dateOfDispatch).toBe(
      VALID_NEWSLETTER.dateOfDispatch
    );
  });

  it("should update newsletter by id", async () => {
    const VALID_NEWSLETTER = {
      header: "Newsletter 1",
      content: "Content!",
      number: 1,
      dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
    };

    const CHANGES = {
      header: "Newsletter 2",
      content: "Other Content",
    };

    const createdNewsletter = await addNewNewsletter(VALID_NEWSLETTER);

    const updatedNewsletter = await updateNewsletterById(
      createdNewsletter._id.toString(),
      CHANGES
    );

    expect(updatedNewsletter).toBeDefined();
    expect(updatedNewsletter?.header).toBe(CHANGES.header);
    expect(updatedNewsletter?.content).toBe(CHANGES.content);
  });

  it("should delete newsletter", async () => {
    const VALID_NEWSLETTER = {
      header: "Newsletter 1",
      content: "Content!",
      number: 1,
      dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
    };

    const createdNewsletter = await addNewNewsletter(VALID_NEWSLETTER);

    const deletedNewsletter = await deleteNewsletterById(createdNewsletter._id);

    expect(deletedNewsletter).toBeDefined();
    expect(deletedNewsletter?._id.toString()).toEqual(
      createdNewsletter._id.toString()
    );
  });

  it("should find a newsletter", async () => {
    const VALID_NEWSLETTERS = [
      {
        header: "Newsletter 1",
        content: "Content!",
        number: 1,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
      {
        header: "Newsletter 2",
        content: "Content 2!",
        number: 2,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
    ];

    const createdNewsletterList = [];

    for (const newsletter of VALID_NEWSLETTERS) {
      const createdNewsletter = await addNewNewsletter(newsletter);
      createdNewsletterList.push(createdNewsletter);
    }

    const newsletter = await findNewsletterById(createdNewsletterList[1]._id);

    expect(newsletter).toBeDefined();
    expect(newsletter?._id.toString()).toEqual(newsletter?._id.toString());
  });

  it("should find a newsletters by ids", async () => {
    const VALID_NEWSLETTERS = [
      {
        header: "Newsletter 1",
        content: "Content!",
        number: 1,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
      {
        header: "Newsletter 2",
        content: "Content 2!",
        number: 2,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
      {
        header: "Newsletter 3",
        content: "Content 3!",
        number: 3,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
    ];

    const createdNewsletterIdList: string[] = [];

    for (const newsletter of VALID_NEWSLETTERS) {
      const createdNewsletter = await addNewNewsletter(newsletter);
      createdNewsletterIdList.push(createdNewsletter._id.toString());
    }

    const newsletters = await findNewslettersByIds([
      createdNewsletterIdList[0],
      createdNewsletterIdList[1],
    ]);

    newsletters.forEach((newsletter) => {
      expect(newsletter).toBeInstanceOf(NewsletterModel);
      expect(createdNewsletterIdList).toContain(newsletter._id.toString());
    });

    expect(newsletters.length).toBe(2);
  });

  it("should find last added newsletter", async () => {
    const VALID_NEWSLETTERS = [
      {
        header: "Newsletter 1",
        content: "Content!",
        number: 1,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
      {
        header: "Newsletter 2",
        content: "Content 2!",
        number: 2,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
      {
        header: "Newsletter 3",
        content: "Content 3!",
        number: 3,
        dateOfDispatch: new Date("2013-04-23T18:25:43.511+00:00"),
      },
    ];

    const createdNewsletterIdList: string[] = [];

    for (const newsletter of VALID_NEWSLETTERS) {
      const createdNewsletter = await addNewNewsletter(newsletter);
      createdNewsletterIdList.push(createdNewsletter._id.toString());
    }

    const lastAddedNewsletter = await findLastAddedNewsletter();

    expect(lastAddedNewsletter?._id.toString()).toBe(
      createdNewsletterIdList[createdNewsletterIdList.length - 1]
    );
  });
});
