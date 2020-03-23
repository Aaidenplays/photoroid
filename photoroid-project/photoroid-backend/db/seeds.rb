# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



u1 = User.create(name:"Aaiden", bio: "bleh") 
u2 = User.create(name:"Jack", bio: "blah") 

FriendRequest.create(requestor: u1, receiver: u2, status: "pending")

b1 = Board.create()
ub1 = UserBoard.create(user: u1, board: b1, status: "pending")

m1 = Media.create(board: b1)

c1 = Comment.create(media: m1)