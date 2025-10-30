import {
  ChatRoomId,
  ChatRoom,
  ChatId,
  ChatContent,
  ChatList,
  NewChat,
} from '@/types/chat'
import {
  ChatRoomIdDto,
  ChatRoomDto,
  ChatIdDto,
  ChatContentDto,
  ChatListDto,
  NewChatDto,
} from '@/types/dto/chat.dto'

export function adapterChatRoomId(dto: ChatRoomIdDto): ChatRoomId {
  return {
    chatRoomId: dto.chatRoomId,
  }
}

export function adapterChatRoom(dto: ChatRoomDto): ChatRoom {
  return {
    otherMemberId: dto.otherMemberId,
    chatRoomId: dto.chatRoomId,
    otherMemberNickname: dto.otherMemberNickname,
    otherMemberProfileImageUrl: dto.otherMemberProfileImageUrl,
    otherMemberThumbnailImageUrl: dto.otherMemberThumbnailImageUrl,
    lastChatContent: dto.lastChatContent,
    lastChatReceivedAt: dto.lastChatReceivedAt,
    unreadCount: dto.unreadCount,
  }
}

export function adapterChatRoomList(dtoList: ChatRoomDto[]): ChatRoom[] {
  return dtoList.map((dto) => adapterChatRoom(dto))
}

export function adapterChatId(dto: ChatIdDto): ChatId {
  return {
    chatId: dto.chatId,
  }
}

export function adapterChatContent(dto: ChatContentDto): ChatContent {
  return {
    chatId: dto.chatId,
    senderId: dto.senderId,
    senderNickname: dto.senderNickname,
    senderProfileUrl: dto.senderProfileUrl,
    senderThumbnailUrl: dto.senderThumbnailUrl,
    chatContent: dto.chatContent,
    chatType: dto.chatType,
    sentAt: dto.sentAt,
    mine: dto.mine,
  }
}

export function adapterChatList(dto: ChatListDto): ChatList {
  return {
    content: dto.content.map(adapterChatContent),
    hasNext: dto.hasNext,
    opponentActive: dto.opponentActive,
  }
}

export function adapterNewChat(dto: NewChatDto): NewChat {
  return {
    newChats: dto.newChats.map(adapterChatContent),
    opponentActive: dto.opponentActive,
  }
}
