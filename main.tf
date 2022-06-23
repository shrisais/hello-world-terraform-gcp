terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  credentials = var.gcp-creds
  project = "focus-poet-354200"
  region  = "us-central1"
  zone    = "us-central1-c"
}

variable "gcp-creds" {
  default= ""
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
