// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome (agent) {
    agent.add(`Seja bem vindo! Digite "Liberar Visao" para solicitar acesso aos benefícios. `);
  }

  function fallback (agent) {
    agent.add(`Não entendi, tente escrever de outra forma. `);
    agent.add(`Experiemente falar "Ola".`);
  }

  function fim (agent) {
    agent.add(`Muito Obrigado, espero falar com você novamente.`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  //  function Liberar(agent) {
  //    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
  //    agent.add(new Card({
  //        title: `Title: this is a card title`,
  //        imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
  //        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //        buttonText: 'This is a button',
  //        buttonUrl: 'https://docs.dialogflow.com/'
  //      })
  //    );
  //    agent.add(new Suggestion(`Quick Reply`));
  //    agent.add(new Suggestion(`Suggestion`));
  //    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  //  }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('welcome', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Fim', fim);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  agent.handleRequest(intentMap);
});