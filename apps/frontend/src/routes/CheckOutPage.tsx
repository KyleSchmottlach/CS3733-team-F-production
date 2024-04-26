import React, {ChangeEvent, useState } from 'react';
import { TextField, Button, CardContent, Typography, Box } from '@mui/material';
import { FlowerDeliveryFormSubmission } from '../common/formSubmission/FlowerDeliveryFormSubmission.ts';
import {useLocation} from "react-router-dom";
import {GiftDeliveryFormSubmission} from "../common/formSubmission/GiftDeliveryFormSubmission.ts";
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
  balloons: 3.99,
  cards: 1.99,
  bears: 5.99
};

const presentFlowers: string[] = [];
function loadFlowers() {
  if (InitCart.RRose !== 0){
    presentFlowers.push("RRose");
  }
  if (InitCart.WRose !== 0){
    presentFlowers.push("WRose");
  }
  if (InitCart.RCarn !== 0){
    presentFlowers.push("RCarn");
  }
  if (InitCart.Tulip !== 0){
    presentFlowers.push("Tulip");
  }
}

const flowerAmounts: number[] = [];
function loadFlowerAmounts() {
  if (InitCart.RRose !== 0){
    flowerAmounts.push(InitCart.RRose);
  }
  if (InitCart.WRose !== 0){
    flowerAmounts.push(InitCart.WRose);
  }
  if (InitCart.RCarn !== 0){
    flowerAmounts.push(InitCart.RCarn);
  }
  if (InitCart.Tulip !== 0){
    flowerAmounts.push(InitCart.Tulip);
  }
}

const presentGifts:string[] = [];
function loadGifts() {
  if (InitCart.Balloons !== 0){
    presentGifts.push("Balloons");
  }
  if (InitCart.Cards !== 0){
    presentGifts.push("Cards");
  }
  if (InitCart.Bears !== 0){
    presentGifts.push("Bears");
  }
}

const giftAmounts:number[] =[];

function loadGiftAmounts() {
  if (InitCart.Balloons !== 0){
    giftAmounts.push(InitCart.Balloons);
  }
  if (InitCart.Cards !== 0){
    giftAmounts.push(InitCart.Cards);
  }
  if (InitCart.Bears !== 0){
    giftAmounts.push(InitCart.Bears);
  }
}

const flowerCart: FlowerDeliveryFormSubmission[] = [];
const giftCart: GiftDeliveryFormSubmission[] = [];

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
  //const [flowerAmounts, setFlowerAmounts] = React.useState<number[]>([0, 0, 0, 0]);

  loadFlowers();
  loadGifts();
  loadFlowerAmounts();
  loadGiftAmounts();

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
  const parseAmount = (amountStr: string): number => {
    return parseInt(amountStr, 10) || 0;
  };

  const location = useLocation();
  if (location.state !== null && location.state.RRose !== undefined) {
    flowerCart[0] = location.state;
    // const Famounts: number[] = [parseAmount(location.state.RRose), parseAmount(location.state.WRose), parseAmount(location.state.RCarn), parseAmount(location.state.Tulip)];
    // setFlowerAmounts(Famounts);
  }
  else if (location.state !== null && location.state.balloons !== undefined) {
    giftCart[0] = location.state;
  }

  // Calculate the total price for flowers
  const totalFlowerPrice = flowerCart.reduce((acc, flower) => {
    acc += parseAmount(flower.RRose) * flowerPrices['RRose'] +
      parseAmount(flower.WRose) * flowerPrices['WRose'] +
      parseAmount(flower.RCarn) * flowerPrices['RCarn'] +
      parseAmount(flower.Tulip) * flowerPrices['Tulip'];
    return acc;
  }, 0);

// Calculate the total price for gift
  const totalGiftPrice = giftCart.reduce((acc, gift) => {
    acc += parseAmount(gift.balloons) * giftPrices['balloons'] +
      parseAmount(gift.cards) * giftPrices['cards'] +
      parseAmount(gift.bears) * giftPrices['bears'] ;
    return acc;
  }, 0);

  const totalPrice = totalFlowerPrice + totalGiftPrice;

  return (
    <Box sx={{ pt: '150px' }} display="flex" justifyContent="center" p={4}>
      {/* Payment Details */}
      <Box width="50%" paddingRight={2}>
        <Typography
          variant="h5" gutterBottom>Payment Details
        </Typography>
        <form>
          <TextField
            fullWidth margin="normal"
            label="Name on card"
            value={form.nameOnCard}
            onChange={handleNameOnCardInput}
            variant="outlined" />
          <TextField
            fullWidth margin="normal"
            label="Card number"
            value={form.cardNum}
            onChange={handleCardNumInput}
            variant="outlined" />
          <Box
            display="flex"
            justifyContent="left">
            <TextField
              fullWidth margin="normal"
              label="Expiration"
              variant="outlined"
              value={form.expiration}
              onChange={handleExpirationInput}
              style={{ marginRight: '10px', width: '30%' }} />
            <TextField
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
          >
          </Button>
        </form>
      </Box>

      {/* Order Summary */}
      <Box width="50%" paddingLeft={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Order Summary</Typography>

          {/* Flowers Summary */}
          {presentFlowers.map((flowerKey, index) => {
            const amount = flowerAmounts[index];
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
          {presentGifts.map((giftKey, index) => {
            const amount = giftAmounts[index];
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
            <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
);

}

export default CheckOutPage;
