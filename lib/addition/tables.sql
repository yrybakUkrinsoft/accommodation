CREATE TABLE "review" (
"id" varchar(36) NOT NULL,
"traveledWith" int2 NOT NULL,
"entryDate" int8 NOT NULL,
"travelDate" int8 NOT NULL,
"user" varchar(255) NOT NULL,
"locale" int2 NOT NULL,
PRIMARY KEY ("id")
);


CREATE TABLE "review_title" (
"id" serial4 NOT NULL,
"reviewId" varchar(36) NOT NULL,
"locale" int2 NOT NULL,
"title" varchar(255) NOT NULL,
PRIMARY KEY ("id") ,
CONSTRAINT "fk_review_title_review_1" FOREIGN KEY ("reviewId") REFERENCES "review" ("id")
);


CREATE TABLE "review_text" (
"id" serial4 NOT NULL,
"reviewId" varchar(36) NOT NULL,
"locale" int2 NOT NULL,
"text" text NOT NULL,
PRIMARY KEY ("id") ,
CONSTRAINT "fk_review_text_review_1" FOREIGN KEY ("reviewId") REFERENCES "review" ("id")
);


CREATE TABLE "review_rating" (
"id" serial4 NOT NULL,
"reviewId" varchar(36) NOT NULL,
"general" int2 NOT NULL DEFAULT 0,
"location" int2 NOT NULL DEFAULT 0,
"service" int2 NOT NULL DEFAULT 0,
"priceQuality" int2 NOT NULL DEFAULT 0,
"food" int2 NOT NULL DEFAULT 0,
"room" int2 NOT NULL DEFAULT 0,
"childFriendly" int2 NOT NULL DEFAULT 0,
"interior" int2 NOT NULL DEFAULT 0,
"size" int2 NOT NULL DEFAULT 0,
"activities" int2 NOT NULL DEFAULT 0,
"restaurants" int2 NOT NULL DEFAULT 0,
"sanitaryState" int2 NOT NULL DEFAULT 0,
"accessibility" int2 NOT NULL DEFAULT 0,
"nightlife" int2 NOT NULL DEFAULT 0,
"culture" int2 NOT NULL DEFAULT 0,
"surrounding" int2 NOT NULL DEFAULT 0,
"atmosphere" int2 NOT NULL DEFAULT 0,
"noviceSkiArea" int2 NOT NULL DEFAULT 0,
"advancedSkiArea" int2 NOT NULL DEFAULT 0,
"apresSki" int2 NOT NULL DEFAULT 0,
"beach" int2 NOT NULL DEFAULT 0,
"entertainment" int2 NOT NULL DEFAULT 0,
"environmental" int2 NOT NULL DEFAULT 0,
"pool" int2 NOT NULL DEFAULT 0,
"terrace" int2 NOT NULL DEFAULT 0,
PRIMARY KEY ("id") ,
CONSTRAINT "fk_review_rating_review_1" FOREIGN KEY ("reviewId") REFERENCES "review" ("id")
);


