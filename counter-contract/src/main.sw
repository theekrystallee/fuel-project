contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read, write)]
    fn decrement();

    #[storage(read)]
    fn count() -> u64;
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
        storage.counter
    }

    #[storage(read, write)]
    fn increment() {
        storage.counter = storage.counter + 1;
    }

    #[storage(read, write)]
    fn decrement() {
        storage.counter = storage.counter - 1;
    }
}
