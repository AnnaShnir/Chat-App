# Chat-App

Server ( serverClientChat.js ) must be able to

Broadcast incoming messages to each connected client

support multiple clients

handle client disconnect (i.e. does not send messages to disconnected clients)

keep a history of chat messages and broadcast the history to new clients when they connect


Client ( clientServerChat.js ) must be able to

Send messages from standard input to the server

Print all incoming messages from the server

Write a user spec for how users will interact with your app. 

Create a repo on Github for your chat app.


###SPECs

client will connect to the server

client will be given a chance to type their name upon entering the chat app

client's name will be stored by the server in an array

client will be able to type all messages and see their own and other's messages

client will be able to boot another client from the chatroom (server) by typing /kick name

typing /fliptable will boadcast a special message

NB: all other files are scratch, created only as personal execrise. The most important ones are serverClientChat.js  and  clientServerChat.js  (i know that the filenames are confusing, but javascipt is no better).


