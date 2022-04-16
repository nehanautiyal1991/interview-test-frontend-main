# Bonsai Frontend Interview Assignment

Welcome to the Frontend interview test at [Shop Bonsai](https://www.shopbonsai.ca/). First and foremost we'd like to thank you for your time and hope you have fun while doing this assignment!

## Introduction

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today).

The current test is setup with a few basic react components: `Cart`, `CartItem` and `ProductItem`. Feel free to change any of these if you wish! The primary focus of the assignment should be to demonstrate your React, Typescript, Javascript and general coding proficiency!

The folder structure is broken into the frontend folder and server folder, you should do your work in the frontend folder but run the server locally using the **Server** instructions below! Please note that in the frontend, there is temporary data in cart and app just to show you what the components look like, please replace them with the appropriate backend data!

The following should be noted:

1. All the bugs in the assigment are intentional, wink wink, nudge nudge.
2. Work with the data from the backend as if it was real. (Do not manipulate/transform the mockData files)
3. You can make additional assumptions, please note them if they are critical to understanding the way your features are implemented.
4. Please document your changes well and make as many atomic commits as you feel are necessary for someone to track your changes.

## How-To: Getting Started

1. Create a new Github repository
2. Unzip and push the project onto your `main` (or `master`) branch
3. Create a feature branch
4. Make all necessary changes to complete this task
5. Create a pull request towards `main` (or `master`)
6. Share the link to your pull request with our team so our developers can review your assignment
7. After you've heard back from us, make sure to remove your repository

> We avoid working with actual pull requests towards our own Github repository, as that would go against anonymity and also allow previous candidates to see each others assignments.

## Evaluation Criteria

Of your submission, the following will be evaluated:

- Ability to architect features
- Completeness of feature, works as a user would expect such a feature to work
- Adopting and using best practices
- Coding style
- Attention to detail
- Clarity in communicating the feature implemented (Pictures and gifs are highly recommended)

## Features

For this assignment, please implement an _add to cart_ feature from the list of products. We have a simple node server for you to fetch products from. It's up to you to figure out everything required to make it work including frontend data validation and preventing adding to cart for out of stock products. You can find the product data shape [here](https://github.com/ShopBonsai/interview-test-frontend/tree/main/server/types/product.ts).

In this test, please use redux for state management and your preferred side effect library (redux-thunk, redux-saga, redux-observable) if needed! We strongly recommend you follow _functional programming_ practices when it comes to how you write your code, as a result we prefer you don't use redux-toolkit since the code written resembles mutable patterns.

UI should have the following features:

1. **Products should show selectable options based on each `Product` data.**

   Inherently, selectable options are dynamic and each product can have different ones.
   You should be able to select any combination of provided selectable options, but only be able to add to cart a _valid_ product variant. `SelectionOption` is not known ahead of time and is derived from each product.

   A valid variant is one where:

   - it's parent `Product` is not discontinued
   - it's quantity is greater than 0
   - is not discontinued

2. **Products should show OOS label if**

   - all variants are invalid
   - product is discontinued

3. **Fully functional cart**

   - You should be able to add to cart _valid_ variants
   - You should be able to change the quantity in the cart.
   - You should be able to remove items from cart.

Every `Product` is a collection of `Variants` where each `Variant` contains `selectableOptions`. A `Variant` represents a purchasable product.
All `selectableOptions` will have the same structure accross all variants (for a given product).

For a given product, all of its variants will have the same structure of selectable options. For example, if selectable options for one variant of the product contain:

```typescript
[
  {
    type: 'color',
    value: 'red',
  },
  {
    type: 'size',
    value: 'L',
  },
];
```

that means that _all_ variants for that product will contain `color` and `size` selectable options. Not all permutations of `selectableOptions` match to a valid `Variant`.

## Instructions

Ensure [yarn](https://yarnpkg.com/) is installed.

### Server

Start backend server with:

```sh
cd ./server
yarn && yarn start
```

Server should be running at `http://localhost:8000` and product endpoint (GET) is located at `http://localhost:8000/products`

### Frontend

Start frontend server with:

```sh
cd ./frontend
yarn && yarn start
```
