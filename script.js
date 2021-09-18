'use strict';

// UI Variables

const container = document.querySelector('.container');
const seats = document.querySelector('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
let ticketPrice = +movieSelect.value;

const selectedSeats = document.querySelectorAll('.row .seat.selected').length;

// Update Total Seats & Total Seat booking price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Movie Select
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
