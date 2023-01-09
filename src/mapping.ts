import {near, BigInt} from "@graphprotocol/graph-ts"
import {Block, BlockDetails} from "../generated/schema";

export function handleNewBlock(
	block: near.Block
): void {
	console.log(block.header.hash.toString())
	let newBlock = new Block(block.header.hash.toString())

	newBlock.blockNumber = block.header.height;
	newBlock.timestamp = block.header.timestampNanosec;

	let blockDetails = new BlockDetails(block.header.hash.toString())

	let chunkHashes:Array<string> = [];
	let chunkIds:i32[] = [];
	for (let i = 0; i < block.chunks.length; i++) {
		chunkHashes.push(block.chunks[i].chunkHash.toString())
		chunkIds.push(block.chunks[i].shardId)
	}
	blockDetails.chunkHashes = chunkHashes
	blockDetails.chunkIds = chunkIds
	blockDetails.save()

	newBlock.blockDetails = blockDetails.id;
}
