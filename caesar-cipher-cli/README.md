
# Task 1. Caesar cipher CLI tool

**CLI tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

### Installation

```
npm install
```

### Options

1.  **-s, --shift**: Shift count, required
2.  **-a, --action**: Action encode or decode, required
3.  **-i, --input**: Path to input file
4.  **-o, --output**: Path to output file

### Examples

```bash
$ node caesar-cipher-cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node caesar-cipher-cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node caesar-cipher-cli --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
