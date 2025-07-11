resource "aws_s3_bucket" "burendo_toolbox" {
  bucket = local.environment_domain[local.environment]

  tags = merge(local.tags, {
    Name = "burendo-toolbox"
  })
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.burendo_toolbox.arn}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    effect = "Allow"
  }
}


resource "aws_s3_bucket_policy" "burendo_toolbox" {
  bucket = aws_s3_bucket.burendo_toolbox.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "burendo_toolbox_block" {
  bucket                  = aws_s3_bucket.burendo_toolbox.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "toolbox" {
  bucket = aws_s3_bucket.burendo_toolbox.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}
