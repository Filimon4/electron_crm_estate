import DB from "..";
import { Deal as _Deal } from "../entities";

export namespace ReportsNamespace {
  
  export const topRealtors = async () => {
    return await DB.query(`
      select
        first_name,
        sure_name,
        last_name,
          phone,
          SUM(price) AS total_income,
          COUNT(d.id) as total_count
      FROM
          deal d
      left join flat f on d.flat = f.id and d.status = 'close'
      left join "user" u on d.realtor = u.id
      group by
        u.first_name,
        u.sure_name,
        u.last_name,
        u.phone
      ORDER BY
          total_income DESC
      LIMIT 10;  
    `)
  }

  export const incomeMonthsByUser = async(user_id: number) => {
    return await DB.query(`
      WITH months AS (
          SELECT 
              generate_series(
                  DATE_TRUNC('month', MIN(created_at)),
                  DATE_TRUNC('month', NOW()), 
                  '1 month'::interval
              ) as m
          FROM deal d
      )
      SELECT
          m AS month,
          COALESCE(SUM(f.price), 0) AS total_income
      FROM
          months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.realtor = $1 and d.status = 'close'
      LEFT JOIN flat f ON d.flat = f.id
      GROUP BY
          m
      ORDER BY m DESC;
    `, [user_id])
  }
  export const incomeMonths = async() => {
    return await DB.query(`
      WITH months AS (
          select 
          generate_series(
              DATE_TRUNC('month', MIN(created_at)),
              DATE_TRUNC('month', NOW()),
              '1 month'::interval
          ) as m
          from deal
      )
      select
        m as month,
        COALESCE(SUM(f.price), 0) AS total_income
      from
        months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.status = 'close'
      LEFT JOIN flat f ON d.flat = f.id
      group by
        m
      order by m desc  
    `)
  }
  
  export const dealAmountMonths = async () => {
    return await DB.query(`
      WITH months AS (
          select 
          generate_series(
              DATE_TRUNC('month', MIN(created_at)),
              DATE_TRUNC('month', NOW()),
              '1 month'::interval
          ) as m
          from deal
      )
      select
        m as month,
          COUNT(d.id) AS count
      from 
        months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.status = 'close'
      group by
        m
      order by m desc
    `)
  }

  export const dealAmountMonthsByUser = async (user_id: number) => {
    return await DB.query(`
      WITH months AS (
          select 
          generate_series(
              DATE_TRUNC('month', MIN(created_at)),
              DATE_TRUNC('month', NOW()),
              '1 month'::interval
          ) as m
          from deal
      )
      select
        m as month,
          COUNT(d.id) AS count
      from 
        months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.realtor = $1 and d.status = 'close'
      group by
        m
      order by m desc
    `, [user_id])
  }
  
  export const avgIncomeMonths = async () => {
    return await DB.query(`
      WITH months AS (
          select 
          generate_series(
              DATE_TRUNC('month', MIN(created_at)),
              DATE_TRUNC('month', NOW()),   
              '1 month'::interval
          ) as m
          from deal
      )
      select
        m as month,
        COALESCE(AVG(f.price), 0) AS total_income
      from
        months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.status = 'close'
      LEFT JOIN flat f ON d.flat = f.id
      group by
        m
      order by m desc
    `)
  }

  export const avgIncomeMonthsByUser = async (user_id: number) => {
    return await DB.query(`
      WITH months AS (
          select 
          generate_series(
              DATE_TRUNC('month', MIN(created_at)),
              DATE_TRUNC('month', NOW()),   
              '1 month'::interval
          ) as m
          from deal
      )
      select
        m as month,
        COALESCE(AVG(f.price), 0) AS total_income
      from
        months
      LEFT JOIN deal d ON DATE_TRUNC('month', d.created_at) = m and d.realtor = $1 and d.status = 'close'
      LEFT JOIN flat f ON d.flat = f.id
      group by
        m
      order by m desc
    `, [user_id])
  }

}