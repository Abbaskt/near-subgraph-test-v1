import { near, BigInt } from "@graphprotocol/graph-ts";
import { Block, BlockDetails } from "../generated/schema";

export function handleBlock(block: near.Block): void {
	const header = block.header;
	let event = new Block(header.hash.toHexString());
	event.blockNumber = BigInt.fromI32(header.height as i32);
	event.timestamp = BigInt.fromU64(header.timestampNanosec);

	let detailsEvent = new BlockDetails(header.hash.toHexString())
	let chunkHashes:Array<string> = [];
	let chunkIds:i32[] = [];
	for (let i = 0; i < block.chunks.length; i++) {
		chunkHashes.push(block.chunks[i].chunkHash.toHexString())
		chunkIds.push(block.chunks[i].shardId as i32)
	}
	detailsEvent.chunkHashes = chunkHashes
	detailsEvent.chunkIds = chunkIds
	detailsEvent.save();

	event.blockDetails = detailsEvent.id
	event.save();
}