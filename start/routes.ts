/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('record', async ({ view }) => {
  return view.render('record')
})
// Route.get('record','RecordsController').as('record')
Route.group(() => {
  Route.resource('boxer', 'BoxersController').as('boxer')
  Route.resource('fight', 'FightsController').as('fight')
  Route.resource('info', 'InfosController').as('info')
  Route.resource('action', 'ActionsController').as('action')
  Route.resource('target', 'TargetsController').as('target')
  Route.resource('outcome', 'OutcomesController').as('outcome')
  Route.resource('settings', 'SettingsController').as('setting')
  Route.resource('uploads', 'UploadsController').as('uploads')
  Route.resource('classes', 'ClassController').as('classes')
  Route.resource('round', 'RoundController').as('round')



}).prefix('api/v1')
