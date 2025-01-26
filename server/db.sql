create TABLE Users(
    id SERIAL PRIMARY KEY UNIQUE,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance INTEGER NOT NULL
);

create TABLE History(
    id SERIAL PRIMARY KEY,
    bet INTEGER NOT NULL,
    win INTEGER NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

create TABLE tokens(
	user_id INT PRIMARY KEY NOT NULL,
	token TEXT NOT NULL UNIQUE,

	CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
)