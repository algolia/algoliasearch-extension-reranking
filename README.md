# Extensibility - Reranking

## Why?

Allowing our users to use their own reranking strategy as a post-processing step.

### Use-cases:

- Custom merchandising
- Custom personalization strategies
- Custom machine learning model

## How it works?

![Diagram](seqdiag.png)

- User triggers a new search
- The engine returns the results end dispatch a chunk of results to the reranking service
- The reranking service returns the reordered results to the engine
- The engine returns the reordered results to the user

## Setup

Setup of the reranking extension is a two-step process. 

1. Create a web-service. 

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

**Expected response**

The response should include the same hits, in their new order.
Each hit should only include the objectID.

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
We provide the getting started guides for three environments: 

- [Microsoft Azure](/extensibility/reranking/getting-started-azure.html)
- [Google Cloud Platform](/extensibility/reranking/getting-started-gcp.html)
- [Amazon Web Services](/extensibility/reranking/getting-started-aws.html)



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