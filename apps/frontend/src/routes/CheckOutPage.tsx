import React, {ChangeEvent, useState } from 'react';
import { TextField, Button, CardContent, Typography, Box } from '@mui/material';
import { CheckOutPageFormSubmission } from '../common/formSubmission/CheckOutPageFormSubmission.ts';
import { CheckOutPageSubmitButton } from "../components/buttons/CheckOutPageSubmitButton.tsx";
import InitCart from "../common/InitCart.ts";

const flowerPrices = {
  RRose: 5.99,
  WRose: 4.99,
  RCarn: 3.99,
  Tulip: 2.99,
};

const giftPrices = {
  Balloons: 3.99,
  Cards: 1.99,
  Bears: 5.99
};

function getFlowerTotal():number {
  let total = 0;

  total += 5.99*InitCart.RRose;
  total += 4.99*InitCart.WRose;
  total += 3.99*InitCart.RCarn;
  total += 2.99*InitCart.Tulip;

  return total;
}

function getGiftTotal():number {
  let total=0;

  total += 3.99*InitCart.Balloons;
  total += 1.99*InitCart.Cards;
  total += 5.99*InitCart.Bears;

  return total;
}

function CheckOutPage(){
  const total = getFlowerTotal() + getGiftTotal();
  total.toFixed(2);

  const [form, setFormResponses] = useState<CheckOutPageFormSubmission>({
    nameOnCard: "",
    cardNum: "",
    expiration: "",
    cvc: "",
  });

  function handleNameOnCardInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, nameOnCard: e.target.value });
  }

  function handleCardNumInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, cardNum: e.target.value });
  }

  function handleExpirationInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, expiration: e.target.value });
  }

  function handleCVCInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, cvc: e.target.value });
  }

  function clear() {
    setFormResponses({
      nameOnCard: "",
      cardNum: "",
      expiration: "",
      cvc: "",
    });
  }

  return (
    <Box
      sx={{
        pt: '150px',
        '.input': {
          '& input[type=number]': {
            '-moz-appearance': 'textfield'
          },
          '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
          },
          '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
          }
        }
      }}
      display="flex"
      justifyContent="center"
      p={4}
    >
      {/* Payment Details */}
      <Box width="50%" paddingRight={2}>
        <Typography
          variant="h5" gutterBottom>
          Payment Details
        </Typography>
        <form>
          <TextField
            fullWidth margin="normal"
            label="Name on Card"
            value={form.nameOnCard}
            InputLabelProps={{ shrink: true }}
            onChange={handleNameOnCardInput}
            variant="outlined" />
          <TextField
            className={"input"}
            type={"number"}
            InputLabelProps={{ shrink: true }}
            fullWidth margin="normal"
            label="Card number"
            value={form.cardNum}
            onChange={handleCardNumInput}
            variant="outlined" />
          <Box
            display="flex"
            justifyContent="left">
            <TextField
              className={"input"}
              type={"number"}
              InputLabelProps={{ shrink: true }}
              fullWidth margin="normal"
              label="Expiration"
              variant="outlined"
              value={form.expiration}
              onChange={handleExpirationInput}
              style={{ marginRight: '10px', width: '30%' }} />
            <TextField
              className={"input"}
              type={"number"}
              InputLabelProps={{ shrink: true }}
              fullWidth margin="normal"
              label="CVC"
              variant="outlined"
              value={form.cvc}
              onChange={handleCVCInput}
              style={{ width: '30%' }} />
          </Box>
          <Box
            display="flex"
            justifyContent="left"
            mt={2}>
            <CheckOutPageSubmitButton
              input={form}
              clear={clear}
              text={"COMPLETE ORDER"}>
            </CheckOutPageSubmitButton>
          </Box>
          <Button
            color="secondary"
            href={"/"}
          >
            Cancel order
          </Button>
        </form>
      </Box>

      {/* Order Summary */}
      <Box width="50%" paddingLeft={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Order Summary</Typography>

          {/* Flowers Summary */}
          {InitCart.presentFlowers.map((flowerKey, index) => {
            const amount = InitCart.flowerAmounts[index];
            const price = flowerPrices[flowerKey as keyof typeof flowerPrices]; // Assert the key type
            return (
              <Box display="flex" justifyContent="space-between" alignItems="center" key={flowerKey}>
                <Typography variant="subtitle1">{flowerKey}</Typography>
                <Typography variant="body1">{amount}</Typography>
                <Typography variant="body1">${(amount * price).toFixed(2)}</Typography>
              </Box>
            );
          })}

          {/* Gifts Summary */}
          {InitCart.presentGifts.map((giftKey, index) => {
            const amount = InitCart.giftAmounts[index];
            const price = giftPrices[giftKey as keyof typeof giftPrices]; // Assert the key type
            return (
              <Box display="flex" justifyContent="space-between" alignItems="center" key={giftKey}>
                <Typography variant="subtitle1">{giftKey}</Typography>
                <Typography variant="body1">{amount}</Typography>
                <Typography variant="body1">${(amount * price).toFixed(2)}</Typography>
              </Box>
            );
          })}

          {/* Total Price */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="h6">Total Price: ${total.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
);

}

export default CheckOutPage;
