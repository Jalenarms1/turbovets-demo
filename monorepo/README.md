# Monorepo

## Setup

```
cd monorepo

npm i
```

Add a .env and add the following contents: 
```
JWT_SECRET="YOUR_JWT_SECRET"
```

Run the following commands in one, or multiple terminals
```
nx serve api

nx serve dashboard
```

## Architecture Overview

The monorepo takes a modular design at the app level, so it allows for many different applications to be built within the same ecosystem. The apps folder contains an api folder, which has the nest js web server, and also a dashboard folder for the angular client application. They each import shared data structures from the libs folder.
libs/auth will house any reuseable functionality or data structures pertaining to authentication. libs/data holds commonly used data transfer objects that the client and server can both reference to make sure they stay on the same page, when it comes to what the expected input/ouput is going to be.

## Data Model Explanation
Organizations 
<ul>
    <li>id</li>
    <li>name</li>
    <li>User (owner)</li>
    <li>User(users[])</li>
    <li>Task(tasks[])</li>
</ul>
Users 
<ul>
    <li>id</li>
    <li>username</li>
    <li>password</li>
    <li>Organization (organization)</li>
    <li>Task (assignedByMe[])</li>
    <li>Task (assignedToMe[])</li>
    <li>Role (role)</li>
</ul>
Role 
<ul>
    <li>id</li>
    <li>name</li>
    <li>level (could be used for coalescing a required role level)</li>
    <li>User (users[])</li>
  
</ul>

Organizations 
<ul>
    <li>id</li>
    <li>name</li>
    <li>User (assignedBy)</li>
    <li>User (assignedTo)</li>
    <li>TOrganization (organization)</li>
</ul>

Though the realtionship for permissions is built out, time expired before being able to implement it into whats being cpatured and used for security checks

## Access Control Implementation

<ul>
    <li>Users can only see tasks that have been created within their organization</li>
    <li>Users with the Viewer role can only see tasks assigned to them</li>
    <li>Front-end components for creating, updating and delting tasks are hidden to users that don't have the necessary role level (with more time there would be a better component structure for easily hiding components based on user role)</li>
    <li>API endpoints for creating, updating and deleting a task will also verify the user has the required role before validating the request</li>
</ul>


## API Docs

<ul>
    <li>POST /api/auth/login</li>
    <ul>
        <li>
            Request: {"username": "owner1", "password": "ownerpass1"}
        </li>
        <li>Response: {"token": "JWT_TOKEN", "user": "USER"}</li>
    </ul>
    <li>POST /api/tasks</li>
    <ul>
        <li>
            Request: {"assignedBy": "USER", "assignedToUsername": "viewer1" (with more time this field would be a dropdown of users in the org and should be a user object rather than just the username), "title": "title", "dueDate": "Date", "category": "Personal | Work | General", "priority": "High | Medium | Low", "organization": "ORGANIZATION"}
        </li>
        <li>Response: {"assignedTo": "USER", "assignedBy": "USER", "title": "title", "dueDate": "Date", "category": "Personal | Work | General", "priority": "High | Medium | Low"}</li>
    </ul>
    <li>GET /api/tasks</li>
    <ul>
        <li>Response: TasksDto[]</li>
    </ul>
    <li>PUT /api/tasks/:id</li>
    <ul>
         <li>
            Request: {"assignedBy": "USER", "assignedToUsername": "viewer1" (with more time this field would be a dropdown of users in the org and should be a user object rather than just the username), "title": "title", "dueDate": "Date", "category": "Personal | Work | General", "priority": "High | Medium | Low", "organization": "ORGANIZATION"}
        </li>
        <li>Response: UpdateResponse (number of records affected)</li>
    </ul>
    <li>DELETE /api/tasks/:id</li>
    <ul>
        <li>Response: DeleteResponse (number of records affected)</li>
    </ul>
</ul>


## Future Considerations
Rather than checking if the user can access the endpoint, you could have a data structure that caches by endpoint whether that user is able to access which would be an n(1) operation, simple key-value pair lookup. Then, if you had an endpoint where an admin would be able to update user roles, you would just clear that user's data from that cache so that it checks their permission on the next request they make, or update the cached value based on what their permission to those endpoints are going to be based on their new assigned role