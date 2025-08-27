
CREATE TABLE "user"(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  role VARCHAR(50) DEFAULT 'customer'
);

create TABLE products(
  product_id SERIAL PRIMARY KEY,
  product_manuf VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  estimation DECIMAL(3, 2) DEFAULT 3,
  reviews DECIMAL(8) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);