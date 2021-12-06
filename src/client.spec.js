const path = require('path');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const axios = require('axios')

describe('test', () => {
    const mock_port = 1234;
    const mock_server_url = 'http://127.0.0.1:' + mock_port

    const provider = new PactV3({
        consumer: 'web_server',
        provider: 'api_server',
        port: mock_port,
        dir: path.resolve(process.cwd(), 'tests', 'pacts')
    });

    it('test getTodos()', () => {
        provider
            .uponReceiving("a GET request to get todos")
            .withRequest({
                method: 'GET',
                path: '/todos',
            })
            .willRespondWith({
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    _id: MatchersV3.string("1"),
                    isComplete: MatchersV3.boolean(false),
                    text: MatchersV3.string("do something")
                },
            });
        return provider.executeTest(() => {
            return axios.get(mock_server_url + '/todos').then((res) => res.data)
                .then((res) => {
                    expect(res.text).toBe("do something");
                    expect(res._id).toBe("1");
                    expect(res.isComplete).toBe(false);
                })
                .catch((err) => {
                    expect(err).toBeNull();
                });
        });
    })

    it('test createTodo()', () => {
        provider
            .uponReceiving("a POST request to create a new todo")
            .withRequest({
                method: 'POST',
                path: '/todos',
                body: {
                    text: "do something"
                }
            })
            .willRespondWith({
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    _id: MatchersV3.string("1"),
                    isComplete: MatchersV3.boolean(false),
                    text: MatchersV3.string("do something")
                },
            });
        return provider.executeTest(() => {
            return axios.post(mock_server_url + '/todos', { text: "do something" })
            .then((res) => res.data)
                .then((res) => {
                    expect(res.text).toBe("do something");
                    expect(res._id).toBe("1");
                    expect(res.isComplete).toBe(false);
                })
                .catch((err) => {
                    expect(err).toBeNull();
                });
        });
    })
})