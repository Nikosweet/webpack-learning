CREATE TABLE buyer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255),
  mail VARCHAR(255) NOT NULL,
  isActivated BOOLEAN DEFAULT FALSE NOT NULL,
  activationLink VARCHAR(255) NOT NULL
);

CREATE TABLE buyerToken (
  id INT NOT NULL REFERENCES buyer,
  refreshToken VARCHAR(255) NOT NULL
)

CREATE TABLE seller (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  mail VARCHAR(255) NOT NULL,
  isActivated BOOLEAN DEFAULT FALSE NOT NULL,
  activationLink VARCHAR(255) NOT NULL
);

CREATE TABLE sellerToken (
  id INT NOT NULL REFERENCES seller,
  refreshToken VARCHAR(255) NOT NULL
)

create TABLE product(
  product_id SERIAL PRIMARY KEY,
  seller_id INT NOT NULL REFERENCES seller,
  seller VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  estimation DECIMAL(3, 2) DEFAULT 3,
  reviews DECIMAL(8) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

