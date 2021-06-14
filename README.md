# Extensibility - Reranking

## What is reranking extension?

Reranking extension provides the possibility to re-rank items based on more than just a custom ranking, but based on a specific logic, for example:

- Custom merchandising (e.g. based on number of impressions)
- Custom personalization strategies
- Custom machine learning model

Reranking extension is a post-processing step for a search request giving you the full control of the final search results ranking.

## How it works?

The sequence diagram shows how the reranking extensions works.

![Diagram](seqdiag.png)

- A User triggers a new search
- The engine performs a search end dispatch a chunk of results to the reranking extension endpoint
- The reranking service performs reranking and returns the reordered result to the engine
- The engine returns the reordered results to the User

## Setup

Setup of the reranking extension consists of two steps. 

1. Create a reranking web-service. 

The reranking is performed by a web-service which is able to respond to requests on a specific endpoint.
Those requests include minimal information about the records and their ranking criteria.

**Request body example:**

```ts
{
"hits": [
 {
   "objectID": "object-1",
   "_rankingOrderedValues": [
     {
       "criterion": "typo",
       "order": "asc",
       "value": 1
     },
     // ...
     {
       "criterion": "custom",
       "field": "rating",
       "order": "asc",
       "value": "3"
     }
   ]
 },
 // ...
]
}
```

The response should include the same hits, in their new order.
Each hit should only include the objectID.

**Expected response**

```ts
{
 "hits": [
   { "objectID": "object-2" },
   { "objectID": "object-1" },
   // ...
 ]
}
```

For performance & cost reasons, reranking servers should be hosted as close as possible to your application. 


2. Set the reranking endpoint in the settings 

Set `extensions.reranking` with the following setting <-- link to the API clients documentation? /-->

```ts
{
  "extensions": {
    "reranking": {
      "enabled": true,                                 // Activates the feature
      "endpoint": "https://example.org/my-endpoint",   // URL to target
      "maxNbHits": 100                                 // Amount of hits to rerank
    }
  }
}
```


#### Getting started reranking extension with Azure

- Click `Create resource` button
- In the provided list of the resources select "Web app"
<img src="basics.jpg" alt="basics" width="200"/>
  - Select a resource group or create a new one if needed
  - Input the app name
  - Select Docker container on Linux operating system
  - Choose the region
  - Choose a service plan and click Next

- In the Docker setup
<img src="docker.jpg" alt="docker" width="200"/>
  - Select `Single Container` option
  - Select `Docker Hub` as the image source
  - Select `Public` visibility
  - Set `Image and tag` field with `algolia/test-reranking:1.0.2`
  - Click `Review + create` button. The validation of the app will take some time.

- Once the validation passed, click `Create` button and wait until the deployment finished.
- Open the created resource by clicking `Go to resource`

<img src="configuration.jpg" alt="configuration" width="200"/>
- Select `Settings` -> `Configuration`
- Click `New application setting`
- Set name to `PORT` and value to `80`, click `OK` and then `Save` button. 
- You are all set. Go to `Overview` section. You can find the URL of your application which can be used as the endpoint in the index settings.


#### Getting started reranking extension with GCP

TODO:

#### Getting started reranking extension with AWS

TODO: