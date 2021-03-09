from sqlalchemy import Boolean, Column, String

from app.db.base_class import Base


class User(Base):
    username = Column(String(128), index=True, unique=True, nullable=False)
    email = Column(String(128), index=True, unique=True, nullable=False)
    hashed_password = Column(String(128))
    first_name = Column(String(128))
    last_name = Column(String(128))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    @property
    def full_name(self):
        fn = []
        if self.first_name:
            fn.append(self.first_name)
        if self.last_name:
            fn.append(self.last_name)
        return ' '.join(fn)

    __table_args__ = {
        'schema': 'security',
    }

