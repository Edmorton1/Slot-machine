create TABLE Users(
    id SERIAL PRIMARY KEY UNIQUE,
    login VARCHAR(255) NOT NULL,
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