Error

WalletConnect cannot be built with vite yet., try to fix this

for now use

`npm run dev`

## Famone Dao

A Condo Investing Platform
[admin](https://estate-dao.herokuapp.com/admin)

credential: user: john@famone
pass: myDupuq56RuK8Q5
How it works,

1. Memeber Creates A Condo Funding Proposal
2. Admin Appoves for voting
3. Members vote using choice token
4. Elected Condo becomes active for investing.

## Why we made it a little bit centralized,

Because of the limitations of Algorand Teal(No Array to save large Objects), so i decided to add a centralized authority to handle this.

## RoadMap
1. create rules so each member can access these centralized data e.g Condo Information Data
2. Launch our Token, for now we use $Choice for governance and Algo for finance


## Bugs I Know.

- User Invest to a closed Condo Sale
- User Over-Invests into the condo limits.