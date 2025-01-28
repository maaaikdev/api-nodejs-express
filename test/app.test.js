//TODO Unit testing, No necesita una peticion POST

describe("[APP] general test", () => {
    test("This return...", () => {
        const a = 4;
        const b = 4;
        const total = a + b;
        expect(total).toEqual(8)
    })
})