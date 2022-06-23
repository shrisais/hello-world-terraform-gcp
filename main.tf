terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  project = "focus-poet-354200"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_storage_bucket" "helloworld-ci-cd-terraform" {
  name = "helloworld-ci-cd-terraform"
  location = "US"
}
