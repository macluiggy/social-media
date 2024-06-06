import { FirstOne1716904139007 } from '../migrations/1716904139007-first-one';
import { RemoveTestColumnPostEntity1716909805982 } from '../migrations/1716909805982-remove-test-column-post-entity';
import { AddCascadeOnPostsTableForUsersTable1717512814811 } from '../migrations/1717512814811-add-cascade-on-posts-table-for-users-table';
import { AddLikeEntity1717688090801 } from '../migrations/1717688090801-add-like-entity';
import { AddCascadeOptionsInLikeTable1717688569232 } from '../migrations/1717688569232-add-cascade-options-in-like-table';
import { UniqueConstraintLikeEntity1717689713669 } from '../migrations/1717689713669-unique-constraint-like-entity';
import { UniqueConstraintFollowEntity1717689884271 } from '../migrations/1717689884271-unique-constraint-follow-entity';

export default [
  FirstOne1716904139007,
  RemoveTestColumnPostEntity1716909805982,
  AddCascadeOnPostsTableForUsersTable1717512814811,
  AddLikeEntity1717688090801,
  AddCascadeOptionsInLikeTable1717688569232,
  UniqueConstraintLikeEntity1717689713669,
  UniqueConstraintFollowEntity1717689884271,
];
