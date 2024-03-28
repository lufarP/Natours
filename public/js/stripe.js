/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51OzD1ZSE7mLe3VCTdvCTP0ZK6T1cb3OwCF75Rx1PgvV1MCUxF6d5u8YZ15vIHkQS8lkK4LnqyLA0gosBiwwcECNL00Cmboqs1x'
);
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/bookings/create-checkout-session/${tourId}`
    });
    stripe.redirectToCheckout({
      sessionId: res.data.session.id
    });
  } catch (error) {
    showAlert(error);
    console.log(error);
  }
};
