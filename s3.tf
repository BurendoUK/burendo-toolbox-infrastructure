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
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = ["${aws_cloudfront_distribution.toolbox_distribution.arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "burendo_toolbox" {
  bucket = aws_s3_bucket.burendo_toolbox.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_s3_bucket_public_access_block" "burendo_toolbox_block" {
  bucket = aws_s3_bucket.burendo_toolbox.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
