terraform {
  backend "gcs" {
    bucket = "focus-poet-354200-tfstate"
    prefix = "env/dev"
  }
}