import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from "react-redux";
import { ColleagueCarousel, CreatePost, Navbar, PostCard, SortByDropdown, TagsCarousel } from "../../components";
import { userSelector } from "../../selectors/user.selector";
import useFeedHook from '../../common/hooks/useFeedHook';
import "./Home.scss";
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  const user = useSelector(userSelector);
  const { posts, loading, meta, sortBy, setSortBy, fetchData, fetchMoreData } = useFeedHook({ empId: user.entity.empId, type: 'feed' });
  console.log(posts);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <CreatePost />
          <ColleagueCarousel/>
          <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
          {loading && <Spinner />}
          {!loading && posts.length !== 0 && <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={meta.hasMore}
            loader={<Spinner/>}
            endMessage={<h3>No More Posts</h3>}
          >
            {
              posts?.map((o, idx) => {
                if (o.tagCarousel) {
                  return <TagsCarousel key={idx} fetchPosts={fetchData}/>
                }
                return <PostCard key={idx} post={o} />
              })
            }
          </InfiniteScroll>
          }
        </div>
      </div>
    </>
  );
};
export default Home;
