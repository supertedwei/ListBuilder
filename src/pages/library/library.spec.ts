import { DialogParser } from './library';

let dialogParser: DialogParser;

describe('DialogParser: Unit Test', () => {

    beforeEach(() => {
        dialogParser = new DialogParser()
    })

    afterEach(() => {
        dialogParser = null
    })

    it('test [TEXT]', () => {
        var list = dialogParser.parse("[TEXT]")
        expect(list.length).toEqual(1)
        var jsonString = JSON.stringify(list[0])
        expect(jsonString).toEqual('{"args":[],"formula":"[TEXT]","keyword":"TEXT"}')
    })

    it('test [abc:TEXT]', () => {
        var list = dialogParser.parse("[abc:TEXT]")
        expect(list.length).toEqual(1)
        var jsonString = JSON.stringify(list[0])
        expect(jsonString).toEqual('{"args":[],"formula":"[abc:TEXT]","title":"abc","keyword":"TEXT"}')
    })

    it('test [ccc:RANGE(4,10)]', () => {
        var list = dialogParser.parse("[ccc:RANGE(4,10)]")
        expect(list.length).toEqual(1)
        var jsonString = JSON.stringify(list[0])
        expect(jsonString).toEqual('{"args":[],"formula":"[ccc:RANGE(4,10)]","title":"ccc","keyword":"RANGE","arg1":"4","arg2":"10"}')
    })

    it('test [PERCENT(100)]', () => {
        var list = dialogParser.parse("[PERCENT(100)]")
        expect(list.length).toEqual(1)
        var jsonString = JSON.stringify(list[0])
        expect(jsonString).toEqual('{"args":[],"formula":"[PERCENT(100)]","keyword":"PERCENT100)"}')
    })

    it('test [OPTIONS(q,d,f)]', () => {
        var list = dialogParser.parse("[OPTIONS(q,d,f)]")
        expect(list.length).toEqual(1)
        var jsonString = JSON.stringify(list[0])
        expect(jsonString).toEqual('{"args":[],"formula":"[OPTIONS(q,d,f)]","keyword":"OPTIONSq,d,f)"}')
    })
})