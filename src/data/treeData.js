const data = {
  id: "root",
  name: "Root",
  color: "yellow",
  children: [
    {
      id: "saga1",
      name: "Saga 1",
      color: "red",
      children: [
        {
          id: "epic1",
          name: "Epic 1",
          color: "blue",
          children: [
            {
              id: "story1",
              name: "Story 1",
              color: "cyan",
              children: [
                { id: "test1", name: "Test 1", color: "green" },
              ],
            },
          ],
        },
        {
          id: "epic2",
          name: "Epic 2",
          color: "blue",
        },
      ],
    },
    {
      id: "saga2",
      name: "Saga 2",
      color: "red",
    },
  ],
};

export default data;
