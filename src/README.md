design
========

authentication:
- ok so "accounts" is where username and passwords exists.
- "members" is where "socialGroups" accounts exist
- "users" is where "websites" accounts exist
- "admins" is where ACP accounts exist
- "clients" is where CA accounts exist
- "masters" is where the webmaster accounts exist

primary support & help desk feature:
- tickets
- ticketReplies

primary webmaster feature:
- services // CRUD pricing table
- tenants // CRUD (websites, clients, plans, licenseKeys)
- masters // accounts allowed on root

primary client area feature:
- services // for showing the pricing table
- plans // for tenants that have purchased a service
- licenseKeys // for auth of source code usage
- websites // for software install location
- clients // accounts allowed on tenant

primary admin control panel feature:
- website // access to just 1 website at a time
- socialGroups // CRUD multi-tenant communities
- users // accounts allowed on website
- admins // accounts allowed on admin control panel

primary social group feature:
- socialGroup // access to just 1 social group at a time
- bulletinBoards // for a collection of links
- bulletinBoardRefs // for each individual link
- members // accounts allowed on social group

social group discussion feature:
- forums
- forumMains
- mainCategories
- categoryTopics
- topicPosts
- topicViews
- postPoints
- postViews

social group shoutbox frature:
- rooms
- roomLogs

user instant messaging feature:
- directMessages // website wide user to user istant messaging
