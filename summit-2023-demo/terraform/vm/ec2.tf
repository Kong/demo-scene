terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "eu-west-2"
  profile = "kong"
}

resource "aws_vpc" "kongair" {
  cidr_block = "172.16.0.0/16"

  tags = {
    Name = "kongair"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.kongair.id
  tags = {
    Name = "KongAir"
  }
}

resource "aws_route_table" "rtb_public" {
  vpc_id = aws_vpc.kongair.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "KongAir"
  }
}

resource "aws_subnet" "legacy" {
  vpc_id                  = aws_vpc.kongair.id
  cidr_block              = "172.16.10.0/24"
  availability_zone       = "eu-west-2a"
  map_public_ip_on_launch = true

  tags = {
    Name = "kongair"
  }
}

resource "aws_route_table_association" "rta_subnet_public" {
  subnet_id      = aws_subnet.legacy.id
  route_table_id = aws_route_table.rtb_public.id
}

resource "aws_security_group" "kongair" {
  name        = "KongAir"
  description = "Traffic for the KongAir VM"
  vpc_id      = aws_vpc.kongair.id


  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "KongAir"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group_rule" "tls" {
  type              = "ingress"
  description       = "TLS"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.kongair.id
}

resource "aws_security_group_rule" "http" {
  type              = "ingress"
  description       = "HTTP"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.kongair.id
}

resource "aws_security_group_rule" "ssh" {
  type              = "ingress"
  description       = "SSH"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["86.143.19.230/32"]
  ipv6_cidr_blocks  = []
  security_group_id = aws_security_group.kongair.id
}

resource "aws_security_group_rule" "mesh" {
  type              = "ingress"
  description       = "Mesh Traffic"
  from_port         = 10001
  to_port           = 10001
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  ipv6_cidr_blocks  = []
  security_group_id = aws_security_group.kongair.id
}

resource "aws_instance" "flightdata" {
  ami                         = "ami-063e8f8a5f0599010" # Jammy Jellyfish AMD64
  instance_type               = "t3.medium"
  key_name                    = "mheap-studio"
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.legacy.id

  vpc_security_group_ids = [aws_security_group.kongair.id]

  tags = {
    Name = "KongAirFlightData"
  }
}

resource "aws_instance" "sales" {
  ami                         = "ami-063e8f8a5f0599010" # Jammy Jellyfish AMD64
  instance_type               = "t3.medium"
  key_name                    = "mheap-studio"
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.legacy.id

  vpc_security_group_ids = [aws_security_group.kongair.id]

  tags = {
    Name = "KongAirSales"
  }
}

output "flightdata_public_ip" {
  value = aws_instance.flightdata.*.public_ip[0]
}

output "sales_public_ip" {
  value = aws_instance.sales.*.public_ip[0]
}
