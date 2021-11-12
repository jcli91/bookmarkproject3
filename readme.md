# Group Project (Bookmark'd) - Rob Bock, Jeff Li, Seb Patin
#### Backend Readme By Rob Bock

## Dependencies

Our backend dependencies include the following: dotenv, mongoose, express, cors, morgan

## Models

Below is the model for the bookmark schema:

bookmarkSchema = {
    title: String,
    url: String
}

## Backend Route Table

Our routes are listed in the table below:

| url | method | action |
|-----|--------|--------|
| /bookmark | get | display all bookmarks (index)|
| /bookmark/new | get | display form to make a new bookmark (new)|
| /bookmark/ | post | add a new bookmark to database (create)|
| /bookmark/:id | get | show info about a particular bookmark (show)|
| /bookmark/:id/edit | get | show edit form for a particular bookmark (edit)|
| /bookmark/:id | put | update a bookmark's data then redirect somewhere (update)|
| /bookmark/:id | delete | delete a bookmark's data then redirect somewhere (destroy)|
