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

- Create a new resource "Web app" with a new resource group if needed. 
- Select Docker container
- Select Linux Operating System

- In the Docker Setup screen select Docker Hub with public acces and set `algolia/text-reranking:1.0.2` in the tag field


#### Getting started reranking extension with GCP

TODO:

#### Getting started reranking extension with AWS

TODO: