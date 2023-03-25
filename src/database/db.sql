DROP DATABASE IF EXISTS `spanky`;
CREATE DATABASE spanky;

USE spanky;

DROP TABLE IF EXISTS `sp_page`;
CREATE TABLE sp_page(
    uuid VARCHAR(20) PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(150) NOT NULL,
    category VARCHAR(150) NOT NULL,
    tag VARCHAR(150) NOT NULL,
    visibility VARCHAR(10) NOT NULL,
    autor VARCHAR(30) NOT NULL,
    datahtml VARCHAR(2000) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    unique key (uuid)
);

DROP TABLE IF EXISTS `sp_categories`;
CREATE TABLE sp_categories(
    uuid VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS `sp_sub_categories`;
CREATE TABLE sp_sub_categories(
    uuid VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    category_father VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS `sp_company`;
CREATE TABLE sp_company(
    uuid VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS `sp_brand`;
CREATE TABLE sp_brand(
    uuid_brand VARCHAR(20) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    company VARCHAR(50) NOT NULL
);

ALTER TABLE sp_sub_categories ADD CONSTRAINT `SUBCATEGORIAS_CATEGORIA` FOREIGN KEY (`category_father`) REFERENCES `sp_categories` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE sp_brand ADD CONSTRAINT `MARCA_EMPRESA` FOREIGN KEY (`company`) REFERENCES `sp_company` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE user_roles(
    id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(20) NOT NULL
);
INSERT INTO user_roles(rol) VALUES('administrador');
INSERT INTO user_roles(rol) VALUES('editor');
INSERT INTO user_roles(rol) VALUES('autor');

DROP TABLE IF EXISTS `files`;
CREATE TABLE files(
    id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uuid VARCHAR(20) NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    file_name VARCHAR(400) NOT NULL,
    compress VARCHAR(200) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    encoding  VARCHAR(20) NOT NULL,
    dir VARCHAR(100) NOT NULL,
    size INT(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (uuid)
);

DROP TABLE IF EXISTS `status`;
CREATE TABLE status(
    id INT(11) NOT NULL,
    status VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL
);
    
/*DROP TABLE users; */
DROP TABLE IF EXISTS `users`;
CREATE TABLE users(
    id_user INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid_user VARCHAR(20) NOT NULL,
    username VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL DEFAULT '',
    lastname VARCHAR(30) NOT NULL DEFAULT '',
    address VARCHAR(150) NOT NULL DEFAULT '',
    phone VARCHAR(16) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL,
    email_verified BOOLEAN NULL DEFAULT 0,
    status ENUM('true', 'false') NOT NULL DEFAULT 'true',
    remember_token VARCHAR(250) NOT NULL DEFAULT '',
    password VARCHAR(300) NOT NULL,
    id_photo_perfil INT(11) NULL,
    id_role INT(5) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (uuid_user)
);

ALTER TABLE users ADD CONSTRAINT `USERS_logo_Files` FOREIGN KEY (`id_photo_perfil`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE users ADD CONSTRAINT `USER_rol_USER_ROLES` FOREIGN KEY (`id_role`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


DROP TABLE IF EXISTS `sp_products`;
CREATE TABLE sp_products(
    uuid_product VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) DEFAULT '',
    description VARCHAR(1000) DEFAULT '',
    category VARCHAR(100) DEFAULT '',
    category_child  VARCHAR(100) DEFAULT '',
    cant_avaliable INT(11) NOT NULL DEFAULT 0,
    cant_total INT(11) NOT NULL DEFAULT 0,
    price DECIMAL(20) DEFAULT 0,
    desc_price DECIMAL(3) DEFAULT 0,
    link VARCHAR(200) DEFAULT '',
    id_status INT(11) DEFAULT 1,
    cant_like INT(10) DEFAULT 0,
    estado VARCHAR(200) DEFAULT '',
    id_image VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (uuid_product)
);



/* custom form  */

DROP TABLE IF EXISTS `sp_customform`;

CREATE TABLE sp_customform(
    uuid_form VARCHAR(100) NOT NULL,
    enable VARCHAR(20) NOT NULL,
    title_form VARCHAR(20) NOT NULL,
    autor VARCHAR(30),
    mailto VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    baseurl VARCHAR(100) NOT NULL,
    message VARCHAR(600) NOT NULL,
    data MEDIUMTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                                                                                                                                                                                                                
    FOREIGN KEY(autor) REFERENCES users(uuid_user)
);

DROP TABLE IF EXISTS `sp_products_images`;

CREATE TABLE sp_products_images(
    id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_producto VARCHAR(20) NOT NULL,
    id_image VARCHAR(20) NOT NULL,
    orden INT(5)
);


DROP TABLE IF EXISTS `sp_products`;

CREATE TABLE sp_products(
    uuid_product VARCHAR(20) NOT NULL,
    uuid_autor VARCHAR(30) NOT NULL,
    name_product VARCHAR(300) NOT NULL,
    description TEXT(20000),
    id_empresa INT(20) NOT NULL,
    id_category INT(20) NOT NULL,
    id_subcategory INT(20) NOT NULL,
    tags VARCHAR(100) DEFAULT '',
    season VARCHAR(20) NOT NULL,
    gender INT(20) NOT NULL,
    colors VARCHAR(2000) NOT NULL,
    quantity INT(20) NOT NULL,
    quantity_sold INT(20) NOT NULL,
    price DECIMAL(20) NOT NULL,
    discount DECIMAL(20) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    status VARCHAR(20) NOT NULL,
    index_page VARCHAR(20) NOT NULL,
    meta_description VARCHAR(4000) NOT NULL,
    meta_keywords VARCHAR(4000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    unique KEY(uuid_product)
);

ALTER TABLE sp_products ADD CONSTRAINT `PRODUCTS_autor_USERS` FOREIGN KEY (`uuid_autor`) REFERENCES `users` (`uuid_user`) ON DELETE CASCADE ON UPDATE CASCADE;



/* DROP TABLE IF EXISTS `sp_customfieldform`;

CREATE TABLE sp_fieldform(
    uuid_field_form VARCHAR(100) NOT NULL,
    
); */


/* 
SELECT username,name,lastname,address,phone,email,created_at,
(SELECT if(files.compress,files.compress,files.file_name) FROM files WHERE files.id = users.id_photo_perfil) as photo,
(SELECT user_roles.rol FROM user_roles WHERE user_roles.id = users.id_role) as role FROM `users`; 
*/