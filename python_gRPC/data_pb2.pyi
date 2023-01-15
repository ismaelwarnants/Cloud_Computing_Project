from google.protobuf import empty_pb2 as _empty_pb2
from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class LeaderboardRequest(_message.Message):
    __slots__ = []
    def __init__(self) -> None: ...

class LeaderboardResponse(_message.Message):
    __slots__ = ["scores"]
    SCORES_FIELD_NUMBER: _ClassVar[int]
    scores: _containers.RepeatedCompositeFieldContainer[UserScore]
    def __init__(self, scores: _Optional[_Iterable[_Union[UserScore, _Mapping]]] = ...) -> None: ...

class UserScore(_message.Message):
    __slots__ = ["score", "user_id"]
    SCORE_FIELD_NUMBER: _ClassVar[int]
    USER_ID_FIELD_NUMBER: _ClassVar[int]
    score: int
    user_id: str
    def __init__(self, user_id: _Optional[str] = ..., score: _Optional[int] = ...) -> None: ...
