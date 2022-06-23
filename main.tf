resource "google_storage_bucket" "gcs_bucket" {
  name = "hello-world-cicd-bucket",
  location = "us-west2"
}