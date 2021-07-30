> :warning: Please note that the reranking extension feature is in closed beta phase, in the process of being tested before its official release.

# Reranking extensibility

## What is the reranking extension?

The reranking extension provides the possibility to rerank items based on more than just custom ranking. You can rerank items on a specific logic, for example:

- Custom merchandising (e.g. based on number of impressions)
- Custom personalization strategies
- Custom machine learning models

The reranking extension is a post-processing step for a search request that gives you full control of the final search results ranking.

## How does it work?

The sequence diagram below shows how the reranking extensions works.

![Diagram](docs/seqdiag.png)

- A user triggers a new search
- The engine performs a search and dispatches a specified chunk of results to the reranking extension endpoint
- The reranking service performs reranking and returns the reordered result to the engine
- The engine returns the reordered results to the user

The reranking extension joins the existing ranking pipeline as the last step of the tie-breaking algorithm.

<img src="docs/ranking_pipeline_simple.png" alt="Simplified ranking pipeline" width="300"/>

If you have activated the advanced ranking features such as AI-reranking and Personalization, the resulting ranking pipeline will look as follows:

<img src="docs/ranking_pipeline.png" alt="Complete ranking pipeline" width="300"/>

[Reranking setup guide](docs/setup.md)