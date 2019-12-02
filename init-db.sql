create table shopping_cart (
	id serial primary key,
	product varchar(40),
	price money,
	quantity smallint

)

insert into shopping_cart(product, price, quantity)
values ('food', 3.00, 8)

insert into shopping_cart(product, price, quantity)
values ('drinks', 9.00, 23)

insert into shopping_cart(product, price, quantity)
values ('fire wood', 89.00, 220)