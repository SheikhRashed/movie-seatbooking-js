'use strict';

// UI Variables

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
let ticketPrice = +movieSelect.value;
const selectedSeats = document.querySelectorAll('.row .seat.selected').length;

populateUI();

// Save selected movie data and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update Total Seats & Total Seat booking price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  // localStorage.setItem('selectedSeats', seatsIndex);

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Get Data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = JSON.parse(
    localStorage.getItem('selectedMoviePrice')
  );

  selectedSeats !== null && selectedSeats.length > 0
    ? seats.forEach((seat, index) => {
        selectedSeats.indexOf(index) > -1
          ? seat.classList.add('selected')
          : seat.classList.remove('selected');
      })
    : console.log(`You don't have any selected Movie`);

  selectedMovieIndex !== null
    ? (movieSelect.selectedIndex = selectedMovieIndex)
    : console.log(`you not select any movie`);
}

// Movie Select
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial count and toal set
updateSelectedCount();
