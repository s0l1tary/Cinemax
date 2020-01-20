# Cinemax

Cinemas collaborated:
Shaw Theatres
Golden Village
Filmgarde Cineplexes
Cathay Cineplexes

for all locations of each cinema branch visit https://en.wikipedia.org/wiki/List_of_cinemas_in_Singapore

Normal flow of events: Downwards

movies.html (showing all movies available)
showtimes.html (with a particular movie clicked on, show the details of it and showtimes from all cinema locations)
login.html / register.html (if user is not logged in, user will be prompted to login or register)
booking.html (for selected movie, timeslot, and location, show available seats for booking, a notification will be displayed upon successful booking)
snacks.html (user can also purchase snacks in advance for their selected booking)

---INDIVIDUAL PAGES---
profile.html (user can edit profile and view his/her bookings)
promotions.html (displays available promotions)
cinemas.html (displays all cinemas and their locations)
about.html (just a page displaying information about Cinemax)


Booking table
UserID
CinemaID
ShowingID
SnacksID

Cinemas table
ID
name
movieShowing

Snacks table
ID
name

Users table
ID
firstName
lastName
gender
dateOfBirth
contactNumber
email
password