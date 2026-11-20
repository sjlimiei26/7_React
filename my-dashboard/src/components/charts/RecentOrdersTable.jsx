import { formatCurrency } from '../../utils/formatters.js';
import styles from './RecentOrdersTable.module.css';

const STATUS_STYLE_MAP = {
  배송완료: styles.statusCompleted,
  배송중: styles.statusShipping,
  결제완료: styles.statusPaid,
};

/**
 * 최근 주문 내역(8건)을 보여주는 테이블 컴포넌트
 *
 * * 학습 포인트 (리스트 렌더링과 고유 key): 배열 데이터를 `.map()`으로 렌더링할 때는
 *   배열 인덱스 대신 각 항목을 유일하게 식별하는 값(`order.orderId`)을 `key`로 지정해야
 *   React가 항목의 추가/삭제/순서 변경을 정확하고 효율적으로 추적할 수 있습니다.
 *
 * @param {object} props
 * @param {Array<{
 *   orderId: string,
 *   customerName: string,
 *   productName: string,
 *   category: string,
 *   amount: number,
 *   status: string,
 *   orderedAt: string
 * }>} props.orders
 */
const RecentOrdersTable = ({ orders }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">주문번호</th>
            <th scope="col">고객명</th>
            <th scope="col">상품명</th>
            <th scope="col">카테고리</th>
            <th scope="col" className={styles.alignRight}>
              결제금액
            </th>
            <th scope="col">배송상태</th>
            <th scope="col">주문일시</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const statusClass =
              STATUS_STYLE_MAP[order.status] ?? styles.statusPaid;

            return (
              <tr key={order.orderId}>
                <td className={styles.orderId}>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.category}</td>
                <td className={styles.amount}>
                  {formatCurrency(order.amount)}
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${statusClass}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.orderedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
