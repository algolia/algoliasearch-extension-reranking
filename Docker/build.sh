#! /bin/bash

set -euo pipefail

image="algolia/test-reranking"
folder="docker/reranking"

usage() {
  echo "This script wraps the main docker/build.sh script with:
- image = \"${image}\"
- folder = \"${folder}\"
docker/build.sh's usage below:
"
  docker/build.sh --help

  exit 1
}

rootdir=$(git rev-parse --show-toplevel)
cd ${rootdir}

if [[ "$*" == *--help* ]]; then
  usage
fi

docker/build.sh --image "${image}" --folder "${folder}" "$@"
