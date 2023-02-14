# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Since we are talking about tables, it should be safe to assume that we are working with a relational database. For this particular exercise, I'm writing tickets as if we were using python for the BE.

- Ticket 1

  > **Build the `generate_custom_agent_id` helper function**  
  > Implement a helper higher order function that takes a function as an argument, executes it, and returns a string that serves as as `custom_agent_id`.
  > **Story Points:** 1
  > **Acceptance criteria:**
  > A `custom_agent_id` must be generated as the result of calling this function, passing another function as an argument.

- Ticket 2

  > **Add the `custom_agent_id` field to the many-to-many relationship between Agents and Shifts models**  
  > Create an intermediate model and associate it with the ManyToManyField on the Shifts model.
  > Add a `custom_agent_id` extra field to the intermediate model. This field must be a `unique not null CharField` with a max_length of 8.
  > **Story Points:** 1
  > **Acceptance criteria:**
  > The intermediate table with the extra field must be seen in the database after running the db migration.

- Ticket 3

  > **Update the `book_agent` function and populate the `custom_agent_id` accordingly**  
  > Modify the `book_agent` implementation and populate the `custom_agent_id` field with the already implemented helper function. This helper function receives only one argument, which is the Facility's logic for generating its `custom_agent_id`s.
  > **Story Points:** 1
  > **Acceptance criteria:**
  > A new entry with the `custom_agent_id` extra field must be created on the intermediate table. This entry must also include the Agent ID and the Shift ID.
